   document.addEventListener('DOMContentLoaded', function() {
            // Ajouter un nouveau champ de coût
            document.getElementById('add-cost').addEventListener('click', function() {
                const costsContainer = document.getElementById('costs-container');
                const newCostItem = document.createElement('div');
                newCostItem.className = 'cost-item';
                newCostItem.innerHTML = `
                    <input type="number" class="cost-input" placeholder="Montant (FCFA)" min="0" step="0.01">
                    <input type="text" class="cost-label" placeholder="Description (semences, engrais...)">
                    <button type="button" class="remove-btn">×</button>
                `;
                costsContainer.appendChild(newCostItem);
                
                // Ajouter l'événement de suppression
                newCostItem.querySelector('.remove-btn').addEventListener('click', function() {
                    costsContainer.removeChild(newCostItem);
                });
            });
            
            // Calculer la marge
            document.getElementById('calculate-btn').addEventListener('click', calculateMargin);
            
            // Fonction de calcul de la marge
            function calculateMargin() {
                const productName = document.getElementById('product-name').value || 'votre produit';
                const sellingPrice = parseFloat(document.getElementById('selling-price').value) || 0;
                
                // Calculer le total des coûts
                let totalCosts = 0;
                const costItems = document.querySelectorAll('.cost-item');
                const costsDetails = [];
                
                costItems.forEach(item => {
                    const amount = parseFloat(item.querySelector('.cost-input').value) || 0;
                    const label = item.querySelector('.cost-label').value || 'coût non nommé';
                    totalCosts += amount;
                    costsDetails.push({label, amount});
                });
                
                // Calculer la marge
                const margin = sellingPrice - totalCosts;
                const marginPercentage = totalCosts > 0 ? (margin / totalCosts) * 100 : 0;
                
                // Afficher le résultat
                const resultDiv = document.getElementById('result');
                resultDiv.style.display = 'block';
                
                // Préparer le message en fonction de la marge
                let message = '';
                if (margin > 0) {
                    resultDiv.className = 'positive';
                    message = `Félicitations ! Pour ${productName}, vous avez une marge bénéficiaire de ${margin.toFixed(2)}FCFA (${marginPercentage.toFixed(2)}%).`;
                } else if (margin < 0 ) {
                    alert('Attention! entrer un nombre positive')
                    
                } else {
                    resultDiv.className = 'neutral';
                    message = `Pour ${productName}, vous êtes à l'équilibre (marge = 0FCFA).`;
                }
                
                // Ajouter les détails des coûts
                let detailsHTML = '<h3>Détails des calculs:</h3><ul>';
                costsDetails.forEach(cost => {
                    detailsHTML += `<li>${cost.label}: ${cost.amount.toFixed(2)}FCFA</li>`;
                });
                detailsHTML += `</ul><p>Total des coûts: ${totalCosts.toFixed(2)}FCFA</p>`;
                detailsHTML += `<p>Prix de vente: ${sellingPrice.toFixed(2)}FCFA</p>`;
                detailsHTML += `<p><strong>${message}</strong></p>`;
                
                resultDiv.innerHTML = detailsHTML;
            }
            
            // Permettre la suppression des éléments de coût existants
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const costItem = this.parentNode;
                    document.getElementById('costs-container').removeChild(costItem);
                });
            });
            
            // Permettre le calcul avec la touche Entrée
            document.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    calculateMargin();
                }
            });
        });