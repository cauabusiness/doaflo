let inventoryChartInstance = null;

function renderDashboard() {
    const table = document.getElementById('inventory-table');
    const alertsContainer = document.getElementById('alerts-container');
    
    table.innerHTML = '';
    alertsContainer.innerHTML = '';
    
    let totalFood = 0, totalClothes = 0, totalHygiene = 0;
    const today = new Date("2026-04-23"); 

    let alertsHtml = '';

    inventory.forEach(item => {
        let statusBadge = '';
        let detailText = item.detail;

        if (item.category === 'Alimento') totalFood += item.qty;
        else if (item.category === 'Roupa') totalClothes += item.qty;
        else if (item.category === 'Higiene') totalHygiene += item.qty;

        if (item.category === 'Alimento') {
            const expiryDate = new Date(item.detail);
            const diffTime = expiryDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            detailText = `${expiryDate.toLocaleDateString('pt-BR')}`;

            if (diffDays < 0) {
                statusBadge = `<span class="badge alert"><i class="fa-solid fa-circle-exclamation"></i> Vencido</span>`;
                alertsHtml += `<div class="alert danger"><i class="fa-solid fa-triangle-exclamation"></i> <div><strong>URGENTE:</strong> ${item.qty} unidades de ${item.name} <strong>estão vencidas</strong> e devem ser descartadas!</div></div>`;
            } else if (diffDays <= 20) {
                statusBadge = `<span class="badge alert"><i class="fa-solid fa-clock"></i> Vence em ${diffDays}d</span>`;
                alertsHtml += `<div class="alert danger"><i class="fa-solid fa-stopwatch"></i> <div><strong>Atenção:</strong> ${item.qty} un de ${item.name} vencem em ${diffDays} dias. Priorize na montagem de kits!</div></div>`;
            } else {
                statusBadge = `<span class="badge ok"><i class="fa-solid fa-check"></i> OK</span>`;
            }
        } else {
            if (item.qty <= 5) {
                statusBadge = `<span class="badge low"><i class="fa-solid fa-arrow-trend-down"></i> Baixo</span>`;
                alertsHtml += `<div class="alert warning"><i class="fa-solid fa-circle-info"></i> <div><strong>Estoque Baixo:</strong> Restam apenas ${item.qty} unidades de ${item.name}. Considere pedir doações.</div></div>`;
            } else {
                statusBadge = `<span class="badge ok"><i class="fa-solid fa-check"></i> OK</span>`;
            }
        }

        let iconCat = item.category === 'Alimento' ? 'fa-bowl-food' : (item.category === 'Roupa' ? 'fa-shirt' : 'fa-soap');
        
        table.innerHTML += `
            <tr>
                <td><strong>${item.name}</strong></td>
                <td><span class="badge-cat"><i class="fa-solid ${iconCat}"></i> ${item.category}</span></td>
                <td style="font-weight:600;">${item.qty}</td>
                <td style="color:var(--text-muted); font-size:0.9rem;">${detailText}</td>
                <td>${statusBadge}</td>
                <td><button class="btn-outline" onclick="removeItem(${item.id})" style="padding: 6px 12px; font-size:0.8rem;"><i class="fa-solid fa-minus"></i> Entregar</button></td>
            </tr>
        `;
    });

    if (alertsHtml === '') {
        alertsHtml = `<div class="alert" style="background:#f1f5f9; color:#64748b; justify-content:center;">Tudo em ordem com o estoque! Nenhuma urgência.</div>`;
    }
    alertsContainer.innerHTML = alertsHtml;

    document.getElementById('stat-total').innerText = inventory.reduce((acc, curr) => acc + curr.qty, 0);
    document.getElementById('stat-food').innerText = totalFood;
    document.getElementById('stat-clothes').innerText = totalClothes;
    document.getElementById('stat-hygiene').innerText = totalHygiene;

    updateChart([totalFood, totalClothes, totalHygiene]);
}

function updateChart(dataValues) {
    const ctx = document.getElementById('inventoryChart').getContext('2d');
    
    if (inventoryChartInstance) {
        inventoryChartInstance.data.datasets[0].data = dataValues;
        inventoryChartInstance.update();
    } else {
        inventoryChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels:['Alimentos', 'Roupas', 'Higiene'],
                datasets: [{ data: dataValues, backgroundColor:['#10b981', '#d946ef', '#f97316'], borderWidth: 0, hoverOffset: 4 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } } }, cutout: '70%' }
        });
    }
}

function removeItem(id) {
    const index = inventory.findIndex(i => i.id === id);
    if (index > -1) {
        if (inventory[index].qty > 1) inventory[index].qty -= 1;
        else inventory.splice(index, 1);
        renderDashboard();
    }
}

function openModal() { document.getElementById('addModal').style.display = 'flex'; }
function closeModal() { document.getElementById('addModal').style.display = 'none'; document.getElementById('donationForm').reset(); toggleFields(); }

function toggleFields() {
    const cat = document.getElementById('itemCategory').value;
    if (cat === 'Alimento') {
        document.getElementById('fieldValidade').style.display = 'block';
        document.getElementById('fieldTamanho').style.display = 'none';
        document.getElementById('itemExpiry').required = true;
    } else {
        document.getElementById('fieldValidade').style.display = 'none';
        document.getElementById('fieldTamanho').style.display = 'block';
        document.getElementById('itemExpiry').required = false;
    }
}

document.getElementById('donationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const category = document.getElementById('itemCategory').value;
    const newItem = {
        id: Date.now(),
        name: document.getElementById('itemName').value,
        category: category,
        qty: parseInt(document.getElementById('itemQty').value),
        detail: category === 'Alimento' ? document.getElementById('itemExpiry').value : (document.getElementById('itemSize').value || "Padrão")
    };
    inventory.unshift(newItem);
    closeModal();
    renderDashboard();
});

window.onload = renderDashboard;