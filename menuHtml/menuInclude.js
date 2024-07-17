
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

        // �ش� id�� ���� ��Ұ� �����ϸ� �޴��� �߰��մϴ�
        if (menu.length > 0) {
            var menuItem = $('<a href="' + item.url + '">' + item.menuNm + '</a>');
            menu.append(menuItem);
        }
    });
});
