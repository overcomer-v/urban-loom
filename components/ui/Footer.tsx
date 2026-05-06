import Container from "./Container";

export default function Footer() {
  return (
    <footer>
      <Container className="flex items-start w-full justify-between bg-neutral-800 gap-5 py-12 text-white text-xs [&_h4]:font-semibold [&_h4]:mb-8 [&_span]:opacity-60 [&_span]:text-xs">
        <div className="flex flex-col gap-1 items-center">

          <h4>CUSTOMER SERVICE</h4>
          <span>ABOUT</span>
          <span>CONTACT</span>
          <span>TERMS & CONDITION</span>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <h4>CATEGORIES</h4>
          <span>SHIRTS</span>
          <span>JOGGERS</span>
          <span>FORMALWEARS</span>
          <span>HOODIES</span>
          <span>ACCESSORIES</span>
        </div>
        <h4>CONNECT</h4>
      </Container>
    </footer>
  );
}
