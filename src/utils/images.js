export const getImageUrl = (path) => {
  if (!path) return `${process.env.PUBLIC_URL}/img/Tortas/torta-deco-entera.jpg`;
  if (path.startsWith("http")) return path;
  return `${process.env.PUBLIC_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
