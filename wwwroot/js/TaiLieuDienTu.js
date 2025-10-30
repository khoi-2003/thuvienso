// Bootstrap tab navigation
$('#assetTabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});