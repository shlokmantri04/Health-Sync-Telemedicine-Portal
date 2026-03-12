// test file using native fetch

async function test()
{
    try
    {
        const r1 = await fetch('http://localhost:5000/');
        console.log('--- GET / ---');
        console.log(await r1.text());

        const r3 = await fetch('http://localhost:5000/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ patientName: 'John Doe', age: 40, symptoms: 'Cough', status: 'Pending', heartRate: 85 })
        });
        console.log('\n--- POST /api/appointments ---');
        console.log(await r3.text());

        const r4 = await fetch('http://localhost:5000/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ patientName: 'Jane Smith', age: 29, symptoms: 'Fever', status: 'Completed', heartRate: 92 })
        });
        console.log('\n--- POST /api/appointments (completed) ---');
        console.log(await r4.text());

        const r2 = await fetch('http://localhost:5000/api/appointments');
        console.log('\n--- GET /api/appointments ---');
        console.log(await r2.text());

        const r5 = await fetch('http://localhost:5000/api/appointments/health-summary');
        console.log('\n--- GET /api/appointments/health-summary ---');
        console.log(await r5.text());

    } catch (e)
    {
        console.error('Error:', e);
    }
}

test();
