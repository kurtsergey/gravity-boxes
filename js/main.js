
$(function ()
{
    $(document).on('keydown', function (e)
    {
        if (e.keyCode == 37)
        {
            clear();
        }
        else if (e.keyCode == 38)
        {
            revert();
        }
        else if (e.keyCode == 39)
        {
            generate();
        }
        else if (e.keyCode == 40)
        {
            start();
        }
    });

});



var G = 9.8;
var procId;


var generate = function ()
{
    revert();

    var bh = $(document.body).height();
    var bw = $(document.body).width();

    for (var i = 0; i < 5; ++i)
    {
        var w = Math.round(Math.random() * 100 + 100);
        var h = Math.round(Math.random() * 100 + 100);
        var l = Math.round(Math.random() * (bw - w));
        var t = Math.round(Math.random() * (bh - h));

        $(document.body).append('<div class="box" style="width: ' + w + 'px; height: ' + h + 'px; left: ' + l + 'px; top: ' + t + 'px;"></div>');
    }
};


var clear = function ()
{
    revert();
    $('.box').remove();
};



var start = function ()
{
    var h = $(document.body).height();

    $('.box').each(function (index, item)
    {
        $item = $(item);
        $item
            .data('default.top', $item.css('top'))
            .data('default.bottom', $item.css('bottom'))
            .css('bottom', h - $item.position().top - $item.height())
            .css('top', 'auto')
            .data('bottom', h - $item.position().top - $item.height())
            .data('v', 0)
    });


    procId = setInterval(function ()
    {
        h = $(document.body).height();

        $('.box').each(function (index, item)
        {
            $item = $(item);

            $item.data('bottom', $item.data('bottom') - $item.data('v'));

            if ($item.data('bottom') < 0)
            {
                $item.data('bottom', 0);
            }

            $item.css({ 'bottom': $item.data('bottom') });

            $item.data('v', $item.data('v') + G);
        });
    }, 20);
};


var revert = function ()
{
    clearInterval(procId);

    $('.box').each(function (index, item)
    {
        $item = $(item);
        $item
            .css('top', $item.data('default.top'))
            .css('bottom', $item.data('default.bottom'));
    });
};