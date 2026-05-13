"use client";
import Container from "@/components/ui/Container";
import Dropdown from "@/components/ui/StatusDropDown";
import Subtitle from "@/components/ui/Subtitle";
import { Categories } from "@/types/Categories";
import { EditableProduct } from "@/types/EditableProduct";
import { ProductSexType, SEX_OPTIONS } from "@/types/products";
import { File, Image, Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ProductUpload() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [productInfo, setProductInfo] = useState<EditableProduct>({
    id: "",
    name: "",
    description: "",
    price: 0,
    amount_in_stock: 0,
    category_id: "",
    sex: "unisex",
  });
  const imageInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   console.log(productInfo);
  // }, [productInfo]);

  useEffect(() => {
    async function getCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();

      setCategories(data.categories);
      console.log(data);
    }
    getCategories();
  }, []);

  const categoriesOpt = categories.map((cat: Categories) => {
    return { id: cat.id, label: cat.category };
  });

  const handleUpload = async () => {
    try {
      if (!uploadedImage) return;
      setIsUploading(true);
      const formdata = new FormData();
      formdata.append("file", uploadedImage);
      formdata.append("meta", JSON.stringify(productInfo));

      const res = await fetch("/api/products", {
        body: formdata,
        method: "POST",
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container>
      <div className="w-full flex flex-col py-6 gap-3">
        <div className="flex ">
          <Subtitle label="Product Upload " />
          <button
            disabled={isUploading}
            onClick={() => {
              // console.log(productInfo);
              // console.log(uploadedImage);
              handleUpload();
            }}
            className="px-4 py-2 bg-black text-white text-sm rounded-md font-semibold"
          >
            {isUploading ? <Loader /> : <div>Upload</div>}
          </button>
        </div>
        <div
          onClick={() => {
            imageInputRef?.current?.click();
          }}
          className="flex justify-center cursor-pointer items-center overflow-hidden bg-neutral-100 h-60 w-60 mt-4 mb-4 rounded-2xl"
        >
          <input
            onChange={(e) => {
              console.log(e.target.value);
              setUploadedImage(e.target.files?.[0]);
            }}
            className="hidden"
            type="file"
            accept="image/*"
            ref={imageInputRef}
          />
          {uploadedImage ? (
            <img
              className="object-cover w-full h-full"
              src={URL.createObjectURL(uploadedImage)}
              alt=""
            />
          ) : (
            <div className="flex flex-col items-center opacity-50">
              <Image size={70}></Image>{" "}
              <span className="text-sm">Select Image</span>
            </div>
          )}
        </div>
        <div className="grid md:grid-cols-2 placeholder:text-sm gap-3 [&_input]:rounded-sm [&_input]:px-4 [&_input]:border-2 [&_input]:border-neutral-400 [&_input]:w-full [&_input]:h-12">
          <input
            className="placeholder:text-sm"
            type="text"
            placeholder="Product Name"
            onChange={(e) => {
              setProductInfo((prev) => {
                return { ...prev, name: e?.target?.value };
              });
            }}
          />
          <div className="flex gap-4">
            <Dropdown
              label="Category"
              options={categoriesOpt}
              onSelect={(value) => {
                setProductInfo((prev) => {
                  return { ...prev, category_id: value.id || "" };
                });
              }}
            />
            <Dropdown
              label="Sex"
              options={SEX_OPTIONS.map((item) => {
                return { label: item };
              })}
              onSelect={(value) => {
                setProductInfo((prev) => {
                  return { ...prev, sex: value.label as ProductSexType };
                });
              }}
            />
          </div>
          <input
            className="placeholder:text-sm"
            type="number"
            placeholder="Product Price"
            onChange={(e) => {
              setProductInfo((prev) => {
                return { ...prev, price: Number(e.target.value) };
              });
            }}
          />

          <input
            className="placeholder:text-sm"
            type="number"
            placeholder="Amount In stock"
            onChange={(e) => {
              setProductInfo((prev) => {
                return { ...prev, amount_in_stock: Number(e.target.value) };
              });
            }}
          />
        </div>
        <textarea
          className="h-36! border-2 placeholder:text-sm border-neutral-400 rounded-md p-4 "
          placeholder="Product Description"
          onChange={(e) => {
            setProductInfo((prev) => {
              return { ...prev, description: e?.target?.value };
            });
          }}
        />
      </div>
    </Container>
  );
}
