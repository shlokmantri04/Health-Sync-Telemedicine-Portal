const test = async () =>
{
    try
    {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Shlok Mantri', email: 'example2@gmail.com', password: 'password123' })
        });
        console.log(await response.json());
    } catch (e)
    {
        console.error(e);
    }
}
test();
