const tabGroup = document.querySelectorAll(`input[name="tab-group-1"]`);

export function InitiateTabs() {
    [].filter.call(tabGroup, function (node) {
        node.onclick = () => {
            node.nextElementSibling.nextElementSibling.classList.remove("hidden");
            [].filter.call(tabGroup, function (tab) { 
                if(!Object.is(tab, node))
                    tab.nextElementSibling.nextElementSibling.classList.add("hidden");
            });
        }
    });
}

