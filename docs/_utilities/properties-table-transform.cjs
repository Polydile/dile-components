/**
 * Transform for Eleventy: Add .properties-table class to API property tables
 * 
 * Detects tables with 4 columns (typically Property | Type | Default | Description)
 * and adds class="properties-table" to enable responsive styling.
 * Also adds data-label attributes to table cells for mobile view.
 */

const COLUMN_LABELS = ['Property', 'Type', 'Default', 'Description'];

function propertiesTableTransform(doc) {
  const tables = doc.querySelectorAll('table');
  
  tables.forEach((table, tableIndex) => {
    const headerCells = table.querySelectorAll('thead th, thead td');
    
    // Only process if table has exactly 4 columns
    if (headerCells.length === 4) {
      const headerTexts = Array.from(headerCells)
        .map(cell => cell.textContent.toLowerCase().trim());

      // Check if this looks like a Properties table
      const hasPropertyColumn = headerTexts.some(text => 
        text.includes('property') || text.includes('name')
      );
      
      const hasTypeLikeColumns = headerTexts.some(text => 
        text.includes('type') || text.includes('default') || text.includes('description')
      );

      if (hasPropertyColumn && hasTypeLikeColumns) {
        table.classList.add('properties-table');

        // Wrap the table so it can scroll horizontally without overflowing the body
        if (!table.parentElement.classList.contains('properties-table-wrapper')) {
          const wrapper = doc.createElement('div');
          wrapper.className = 'properties-table-wrapper';
          table.parentNode.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        }

        // Add data-label attributes to all body cells
        const bodyRows = table.querySelectorAll('tbody tr');
        bodyRows.forEach((row, rowIndex) => {
          const cells = row.querySelectorAll('td');
          cells.forEach((cell, cellIndex) => {
            if (cellIndex < COLUMN_LABELS.length) {
              cell.setAttribute('data-label', COLUMN_LABELS[cellIndex]);
            }
          });
        });
      }
    }
  });
}

module.exports = propertiesTableTransform;
