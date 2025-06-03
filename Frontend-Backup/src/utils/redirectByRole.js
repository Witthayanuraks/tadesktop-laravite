export function redirectByRole(role) {
  switch (role) {
    case "admin":
      return "/dashboard-admin";
    case "guru":
      return "/dashboard-guru";
    case "tamu":
      return "/dashboard-tamu";
    case "penerima":
      return "/dashboard-penerima-tamu";
    default:
      return "/";
  }
}
