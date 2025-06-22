document.addEventListener("DOMContentLoaded", () => {
  // восстановление селектов
  const statusSelects = document.querySelectorAll(".status-select");

  statusSelects.forEach(select => {
    const gameKey = select.id;
    const savedStatus = localStorage.getItem(gameKey);
    if (savedStatus) {
      select.value = savedStatus;
    }

    select.addEventListener("change", () => {
      localStorage.setItem(gameKey, select.value);
    });
  });

  // восстановление чекбоксов
  restoreCheckboxes();

  // навешиваем события на чекбоксы
  document.querySelectorAll('.achievement-item input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', updateProgress);
  });

  // обновляем прогресс при загрузке
  updateProgress();
});

function updateProgress() {
  const checkboxes = document.querySelectorAll('.achievement-item input[type="checkbox"]');
  const checked = document.querySelectorAll('.achievement-item input[type="checkbox"]:checked');
  const progressText = document.getElementById('progress-text');
  const trophy = document.getElementById('trophy');

  progressText.textContent = `Выполнено: ${checked.length} из ${checkboxes.length}`;

  checkboxes.forEach((cb, index) => {
    const li = cb.closest('.achievement-item');
    li.classList.toggle('completed', cb.checked);
    localStorage.setItem(`stray-achievement-${index}`, cb.checked);
  });

  trophy.style.display = (checked.length === checkboxes.length) ? 'inline' : 'none';
}

function restoreCheckboxes() {
  const checkboxes = document.querySelectorAll('.achievement-item input[type="checkbox"]');
  checkboxes.forEach((cb, index) => {
    const saved = localStorage.getItem(`stray-achievement-${index}`);
    cb.checked = saved === 'true';
  });
}
