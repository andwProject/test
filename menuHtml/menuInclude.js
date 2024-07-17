
document.addEventListener('DOMContentLoaded', function() {
    var menuItems = [
        { id: 1, menuNm: 'home', url: 'index.html' },
        { id: 2, menuNm: 'About', url: 'about.html' },
        { id: 3, menuNm: 'Services', url: 'services.html' },
        { id: 4, menuNm: 'Contact', url: 'contact.html' },
        { id: 5, menuNm: '123 Example', url: '123.html' } 
    ];

    $.each(menuItems, function(index, item) {
        var menuID = '#menu' + item.id; 
        var menu = $(menuID); 

        // 해당 id를 가진 요소가 존재하면 메뉴를 추가합니다
        if (menu.length > 0) {
            var menuItem = $('<a href="' + item.url + '">' + item.menuNm + '</a>');
            menu.append(menuItem);
        }
    });
});
