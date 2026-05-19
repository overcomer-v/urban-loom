import Container, { FullContainer } from "./Container";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 py-12">
      <Container className="flex items-start w-full justify-between  gap-5  text-white text-xs  [&_h4]:mb-3 [&_span]:opacity-60 [&_span]:font-extralight [&_span]:text-xs">
        <div className="flex flex-col gap-1 items-start">

          <h4>CUSTOMER SERVICE</h4>
          <span>ABOUT</span>
          <span>CONTACT</span>
          <span>TERMS & CONDITION</span>
        </div>
        <div className="flex flex-col gap-1 items-start">
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
