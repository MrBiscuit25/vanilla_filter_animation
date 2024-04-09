const filterList = document.querySelector(".filter");
const filterButtons = filterList.querySelectorAll(".filter-btn");
const conferences = document.querySelectorAll(".conference");

let conferenceIndex = 0;
conferences.forEach((conference) => {
  conference.style.viewTransitionName = `conf-${++conferenceIndex}`;
});
function updateActiveButton(newButton) {
  // find the previously active button
  // & remove the active active class from it
  filterList.querySelector(".active").classList.remove("active");
  // add the active class to our new button
  newButton.classList.add("active");
}

function filterConf(confFilter) {
  // get each conference category
  conferences.forEach((conf) => {
    const confCategory = conf.getAttribute("data-category");
    // check if that category matches the filter
    if (confFilter === "all" || confFilter === confCategory) {
      // if it matches, show that conf
      conf.removeAttribute("hidden");
    } else {
      // if not, hide that conf
      conf.setAttribute("hidden", "");
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const confFilter = e.target.dataset.filter;

    if (!document.startViewTransition) {
      updateActiveButton(e.target);
      filterConf(confFilter);
    }

    document.startViewTransition(() => {
      // change the active button
      updateActiveButton(e.target);
      // filter the list
      filterConf(confFilter);
    });
  });
});
