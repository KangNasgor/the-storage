export async function getItems(query? : string) {
    const response = await fetch(`/api/items?search=${encodeURIComponent(query ?? '')}`, {
        cache: 'no-store'
    })

    if(!response.ok){
        throw new Error('Failed to fetch items')
    }

    const data = await response.json();
        
    return data.message;
}