const fetchAndRenderData = async () => {
    try {
        const response = await axios.get('https://crudcrud.com/api/152ddb4b5b5e497f877fef726c5bf13a/data');
        const data = response.data;

        document.getElementById('one').innerHTML = '';
        document.getElementById('two').innerHTML = '';
        document.getElementById('three').innerHTML = '';

        data.forEach(item => {
            const dishElement = document.createElement('div');
            dishElement.innerHTML = `
                ${item.table} - ₹${item.price}
                <button onclick="deleteDish('${item._id}')">Delete</button>
            `;

            if (item.selectedTable === 'table1') {
                document.getElementById('one').appendChild(dishElement);
            } else if (item.selectedTable === 'table2') {
                document.getElementById('two').appendChild(dishElement);
            } else if (item.selectedTable === 'table3') {
                document.getElementById('three').appendChild(dishElement);
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const deleteDish = async (id) => {
    try {
        await axios.delete(`https://crudcrud.com/api/152ddb4b5b5e497f877fef726c5bf13a/data/${id}`);
        alert('Dish deleted successfully!');
        fetchAndRenderData();
    } catch (error) {
        console.error('Error deleting dish:', error);
    }
};

const handleOne = () => {
    const price = document.getElementById('price').value.trim(); 
    const table = document.getElementById('table').value.trim();
    const selectedTable = document.getElementById('select').value;

    if (!price || !table || !selectedTable) {
        alert('All fields must be filled!');
        return;
    }

    const dataObject = {
        price: price,
        table: table,
        selectedTable: selectedTable
    };

    updateToApi(dataObject);
    document.getElementById('price').value = ''; 
    document.getElementById('table').value = ''; 
    document.getElementById('select').value = 'table1'; 
};

const updateToApi = async (data) => {
    try {
        const response = await axios.post('https://crudcrud.com/api/152ddb4b5b5e497f877fef726c5bf13a/data', data);
        console.log('Form Submitted:', response.data);
        fetchAndRenderData();
    } catch (error) {
        console.error('Error Submitting Form:', error);
    }
};

document.addEventListener('DOMContentLoaded', fetchAndRenderData);
