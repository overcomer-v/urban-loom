import { SORT_OPTIONS } from "@/constants/Sorting-constants";
import pool from "@/lib/db";
import { ProductSexType } from "@/types/products";
import { SortOption } from "@/types/Sorting";

export async function getProducts(
  sort?: SortOption,
  category_id?: string,
  filter?: { sex: ProductSexType },
  textQuery?: string,
) {
  const values: Array<string | ProductSexType> = [];
  const conditions: string[] = [];
  const normalizedTextQuery = textQuery?.trim();

  const searchVector = `
    to_tsvector(
      'english',
      coalesce(p.name, '') || ' ' ||
      coalesce(p.description, '') || ' ' ||
      coalesce(c.category, '')
    )
  `;

  let searchRankSelect = `0::real AS search_rank`;
  let orderBy = "";

  if (category_id) {
    values.push(category_id);
    conditions.push(`c.id = $${values.length}`);
  }

  if (filter?.sex) {
    values.push(filter.sex);
    conditions.push(`p.sex = $${values.length}`);
  }

  if (normalizedTextQuery) {
    values.push(normalizedTextQuery);
    const searchParam = `$${values.length}`;

    conditions.push(
      `${searchVector} @@ websearch_to_tsquery('english', ${searchParam})`,
    );

    searchRankSelect = `
      ts_rank(
        ${searchVector},
        websearch_to_tsquery('english', ${searchParam})
      ) AS search_rank
    `;
  }

  switch (sort) {
    case SORT_OPTIONS[1].value:
      orderBy = "ORDER BY p.price ASC";
      break;
    case SORT_OPTIONS[2].value:
      orderBy = "ORDER BY p.price DESC";
      break;
    case SORT_OPTIONS[0].value:
      orderBy = "ORDER BY p.created_at DESC";
      break;
    default:
      orderBy = normalizedTextQuery
        ? "ORDER BY search_rank DESC, p.id ASC"
        : "ORDER BY p.id ASC";
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const query = `
SELECT
  p.id,
  p.name,
  p.price,
  p.description,
  p.sex,
  c.category,
  c.id as category_id,
  ${searchRankSelect},

  COALESCE(
    json_agg(DISTINCT pi.image_url)
    FILTER (WHERE pi.image_url IS NOT NULL),
    '[]'
  ) AS images,

  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'size', s.name,
        'stock', ps.amount_in_stock
      )
    ) FILTER (WHERE s.name IS NOT NULL),
    '[]'
  ) AS sizes

FROM products p

LEFT JOIN product_images pi
  ON p.id = pi.product_id

LEFT JOIN product_sizes ps
  ON p.id = ps.product_id

LEFT JOIN sizes s
  ON ps.size_id = s.id

LEFT JOIN product_categories pc
  ON p.id = pc.product_id

LEFT JOIN categories c
  ON c.id = pc.category_id

${whereClause}

GROUP BY
  p.id,
  c.category,
  c.id

${orderBy}
`;

  const results = await pool.query(query, values);
  return results.rows;
}


export async function getProduct(id: string) {


  const query = `
SELECT
  p.id,
  p.name,
  p.price,
  p.description,
  p.sex,
  c.category,
  c.id AS category_id,

  COALESCE(
    json_agg(DISTINCT pi.image_url)
    FILTER (WHERE pi.image_url IS NOT NULL),
    '[]'
  ) AS images,

  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'size', s.name,
        'stock', ps.amount_in_stock
      )
    ) FILTER (WHERE s.name IS NOT NULL),
    '[]'
  ) AS sizes

FROM products p

LEFT JOIN product_images pi
  ON p.id = pi.product_id

LEFT JOIN product_sizes ps
  ON p.id = ps.product_id

LEFT JOIN sizes s
  ON ps.size_id = s.id

LEFT JOIN product_categories pc
  ON p.id = pc.product_id

LEFT JOIN categories c
  ON c.id = pc.category_id


  WHERE p.id = $1
GROUP BY
  p.id,
  c.category,
  c.id
`;

  const result = await pool.query(query, [id]);

  return result.rows[0];
}
