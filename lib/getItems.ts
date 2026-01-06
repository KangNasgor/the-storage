export async function getItems() {
    const response = await fetch('http://localhost:3000/api/items', {
        cache: 'no-store'
    })

    if(!response.ok){
        throw new Error('Failed to fetch items')
    }

    const data = await response.json();
    
    return data.message;
}