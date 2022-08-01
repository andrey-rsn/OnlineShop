
export class CatalogService{
    _url="http://localhost:8000/api/v1/Catalog";

    getAllElements= async()=>{
        let res = await fetch(this._url);

        if(!res.ok){
            throw new Error(`Could not fetch ${this._url} status ${res.status}`);
        }

        return await res.json();
    }

    getAllCatalogElements=async ()=>{
        const result = await this.getAllElements();
        return this._transformCartElements(result);
    }

    _transformCartElements=(elements)=>{
        return elements.map(i=>{
            return {
                id:i.id,
                img:i.imageFile,
                name:i.name,
                price: i.price
            }
        })
    }

}