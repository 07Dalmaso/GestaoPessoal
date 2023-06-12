var randomScalingFactor = function () {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};
var randomColorFactor = function () {
    return Math.round(Math.random() * 255);
};

var barChartData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    datasets: [{
        label: 'Receita',
        backgroundColor: "rgba(0,255,0,1)",
        data: [Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000),],
        borderColor: 'white',
        borderWidth: 2
    }, {
        label: 'Despesa',
        backgroundColor: "rgba(255,0,0,1)",
        data: [Math.floor((Math.random() * -5000)), ((Math.random() * 0) - 2000), ((Math.random() * 0) - 750), ((Math.random() * 0) - 5000), ((Math.random() * 0) - 5000), ((Math.random() * 0) - 5000), ((Math.random() * 0) - 5000),],
        borderColor: 'white',
        borderWidth: 2
    },]
};
var myBar = null;
window.onload = function () {
    var ctx = document.getElementById("canvas").getContext("2d");
    myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
        }
    });
};

$('#randomizeData').click(function () {
    $.each(barChartData.datasets, function (i, dataset) {
        dataset.backgroundColor = 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',.7)';
        dataset.data = [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()];

    });
    myBar.update();
});