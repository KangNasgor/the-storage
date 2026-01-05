import { getItems } from '../../../lib/getItems';

export default async function Items(){
    interface Items{
        id : number,
        name : string,
        amount : number
    }

    const items : Items[] = await getItems();

    return(
        <div>
            {items.map(item => (
                <div key={item.id}>
                    <h1>{item.name}</h1>
                    <h2>{item.amount}</h2>
                </div>
            ))}
        </div>
    )
}