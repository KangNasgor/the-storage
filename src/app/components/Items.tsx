import { getItems } from '../../../lib/getItems';
import Button from './Button';
import CreateRecord from './CreateRecord';


export default async function Items(){
    interface Items{
        id : number,
        name : string,
        amount : number,
        categorys : any,
        created_at : string,
        updated_at : Date,
    }

    const items : Items[] = await getItems();

    return(
        <div className='grid grid-cols-1 gap-5'>
            <div className='flex flex-row gap-5'>
                <CreateRecord />
                <Button text='History' background='bg-sky-600' color='white'/>
            </div>
            <table className='table table-auto text-center'>
                <thead className='bg-sky-900'>
                    <tr>
                        <td className='px-5 py-3'>ID</td>
                        <td className='px-5 py-3'>Name</td>
                        <td className='px-5 py-3'>Amount</td>
                        <td className='px-5 py-3'>Category</td>
                        <td className='px-5 py-3'>Creation Date</td>
                        <td className='px-5 py-3'>Date of Update</td>
                        <td className='px-5 py-3'>Options</td>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} className='bg-sky-950'>
                            <td className='px-5 py-3'>{item.id}</td>
                            <td className='px-5 py-3'>{item.name}</td>
                            <td className='px-5 py-3'>{item.amount}</td>
                            <td className='px-5 py-3'>{item.categorys.name}</td>
                            <td className='px-5 py-3'>
                                {new Intl.DateTimeFormat("id-ID", {
                                    dateStyle: 'medium',
                                    timeStyle: "long",
                                }).format(new Date(item.created_at))}
                            </td>
                            <td className='px-5 py-3'>
                                {new Intl.DateTimeFormat("id-ID", {
                                    dateStyle: 'medium',
                                    timeStyle: 'long',
                                }).format(new Date(item.updated_at))}
                            </td>
                            <td className='px-5 py-3 flex flex-row gap-5'>
                                <Button text='Edit' background='bg-sky-600' color='white'/>
                                <Button text='Delete' background='bg-sky-600' color='white'/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}