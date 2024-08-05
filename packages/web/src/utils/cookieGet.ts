
class CookieF {
  public get(value: string) {
    const cookies = document.cookie.split(";")
    const adminTokenString = cookies.find(cookie => cookie.trim().startsWith(`${value}=`));
    if (adminTokenString) {
      const adminToken = adminTokenString.split("=")[1];
      return adminToken
    } else {
      console.log("Admin token not found");
      return ""
    }
  }

}

export const FCookie = new CookieF()
