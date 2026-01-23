import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getItems } from '../../../lib/getItems';
import Button from './Button';
import CreateRecord from './CreateRecord';
import DeleteRecord from './DeleteRecord';
import UpdateRecord from './UpdateRecord';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
            </div>
            <table className='table table-auto rounded-md overflow-hidden text-center'>
                <thead className='bg-sky-900'>
                    <tr className='bg-sky-700 '>
                        <td colSpan={3}>
                            <div className='flex flex-row gap-3 justify-start w-full px-3'>
                                <CreateRecord />
                                <Button text='History' background='bg-sky-600' color='white'/>
                            </div>
                        </td>
                        <td colSpan={3} className='py-2 px-3'>
                            <div className='flex flex-row items-center gap-3 w-full justify-end'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className='w-5 h-5'/>
                                <input className='rounded-md px-3 py-2 text-black bg-white' placeholder='mouse'/>
                                <Button text='Search' background='bg-sky-600' color='white'/>
                            </div>
                        </td>
                    </tr>
                    <tr>
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
                                <UpdateRecord id={item.id}/>
                                <DeleteRecord id={item.id} name={item.name}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}