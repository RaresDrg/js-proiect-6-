import 'tui-pagination/dist/tui-pagination.css';
import TuiPagination from 'tui-pagination';

let currentPage = 1;

function initializeTuiPagination(totalItems, itemsPerPage, onPageChange) {
  const container = document.getElementById('tui-pagination-container');

  const pagination = new TuiPagination(container, {
    totalItems: totalItems,
    itemsPerPage: itemsPerPage,
    visiblePages: 7,
    centerAlign: true,
  });
  pagination.on('afterMove', eventData => {
    currentPage = eventData.page;
    onPageChange(currentPage);
    updateSelectedPageStyle(currentPage);
  });

  function updateSelectedPageStyle(selectedPage) {
    const pageButtons = document.querySelectorAll('.tui-page-btn');
    pageButtons.forEach(pageBtn => {
      pageBtn.classList.remove('tui-is-selected');
    });
    const selectedPageBtn = document.querySelector(
      `.tui-page-btn[data-page="${selectedPage}"]`
    );

    if (selectedPageBtn) {
      selectedPageBtn.classList.add('tui-is-selected');
    }
    const firstPageBtn = document.querySelector('.tui-first-child');
    if (firstPageBtn && selectedPage === 1) {
      firstPageBtn.classList.add('tui-is-selected');
    }
  }
}
export { initializeTuiPagination, currentPage };
