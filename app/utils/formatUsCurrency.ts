const formatUsCurrency = (amount: number | string) => {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return USDollar.format(Number(amount));
};

export default formatUsCurrency;
