async function fetchSlug() {
    const res = await fetch('http://localhost:3001/api/v1/workspaces', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer YOUR_API_KEY_HERE' //Replace with your access token
        },
    });
    const data = await res.json();
    return data;
}

async function main() {
    const slugData = await fetchSlug();
    console.log(slugData);
}

main()
