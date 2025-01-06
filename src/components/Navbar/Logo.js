export function Logo() {
  return (
    <div className="logo">
      <img
        src={`${process.env.PUBLIC_URL}/images/logo-transparent.png`}
        alt="Logo Rateflicks"
      />
    </div>
  );
}
