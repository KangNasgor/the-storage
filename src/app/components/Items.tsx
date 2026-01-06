import { getItems } from '../../../lib/getItems';
import Button from './Button';

export default async function Items(){
    interface Items{
        id : number,
        name : string,
        amount : number
    }

    const items : Items[] = await getItems();

    return(
        <table className='table table-auto text-center'>
            <thead className='bg-gray-500'>
                <tr>
                    <td className='px-5 py-3'>ID</td>
                    <td className='px-5 py-3'>Name</td>
                    <td className='px-5 py-3'>Amount</td>
                    <td className='px-5 py-3'>Options</td>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id} className='bg-gray-600'>
                        <td className='px-5 py-3'>{item.id}</td>
                        <td className='px-5 py-3'>{item.name}</td>
                        <td className='px-5 py-3'>{item.amount}</td>
                        <td className='px-5 py-3 flex flex-row gap-5'>
                            <Button text='Edit' background='#fffff' color='black'/>
                            <Button text='Delete' background='#fffff' color='black'/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}