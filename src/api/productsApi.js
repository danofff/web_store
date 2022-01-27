import baseUrl from "./baseUrl"
import makeHeaders from './makeHeaders'
//Need token ?
export const getProducts = async () => {
    const response = fetch(`${baseUrl}/products`, {
      method: 'GET',
      headers: makeHeaders()
    });
    if (response.ok)
      return  await response.json()
    else{
      const error =  await response.json();
      throw new Error(error.error);}
}