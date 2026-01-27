import { getItems } from '../../lib/getItems';
import Button from '@/app/components/Button';
import CreateRecord from '@/app/components/CreateRecord';
import DeleteRecord from '@/app/components/DeleteRecord';
import UpdateRecord from '@/app/components/UpdateRecord';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '@/app/components/SearchBar';
import CategoryFilter from './components/CategoryFilter';



export default async function Items({ searchParams } : { searchParams? : Promise<{ q? : string}>}){ // Next JS automatically passes the query parameter from the url to this asynchronous function
  interface Items{
      id : number,
      name : string | null,
      amount : number | null,
      categorys : {
          id : number,
          name : string,
      } | null,
      created_at : Date | null,
      updated_at : Date | null,
  }

  const params = await searchParams; // waiting for the parameter to be passed into this variable so we can access the actual query
  const query = params?.q ?? '';
  const items : Items[] = await getItems(query); // Passing query variable to this function

  return(
      <div className='min-h-[100vh] flex justify-center items-center'>
        <div className=''>
            <table className='table table-auto text-center rounded-md overflow-hidden'>
                <thead>
                    <tr className='bg-sky-800'>
                        <td colSpan={6} className='py-2 px-3'>
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-row gap-5 w-4/12'>
                                    <CreateRecord />
                                    <Button text='History' background='bg-sky-600' color='white'/>
                                </div>
                                <CategoryFilter />
                                <div className='flex flex-row items-center gap-3 justify-end w-4/12'>
                                    <SearchBar defaultValue={query}/>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='bg-sky-900'>
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
                            <td className='px-5 py-3'>{item.categorys?.name}</td>
                            <td className='px-5 py-3'>
                                {item.created_at ? new Intl.DateTimeFormat("id-ID", {
                                    dateStyle: 'medium',
                                    timeStyle: "long",
                                }).format(new Date(item.created_at))
                                : '-'}
                            </td>
                            <td className='px-5 py-3'>
                                {item.updated_at ? new Intl.DateTimeFormat("id-ID", {
                                    dateStyle: 'medium',
                                    timeStyle: 'long',
                                }).format(new Date(item.updated_at))
                                : '='}
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
      </div>            
  )
}

export const dynamic = 'force-dynamic';
