
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



var G = 1,
    MAX_WIDTH = 200,
    MAX_HEIGHT = 200,
    INTERVAL = 20;


var procId;


var generate = function ()
{
    revert();

    var bh = $(document.body).height();
    var bw = $(document.body).width();

    var c = $('.box').length;

    for (var i = 0; i < 5; ++i)
    {
        var w = Math.round(Math.random() * MAX_WIDTH + 100);
        var h = Math.round(Math.random() * MAX_HEIGHT + 100);
        var l = Math.round(Math.random() * (bw - w));
        var t = Math.round(Math.random() * (bh - h));

        var id = 'box-' + (c + i);

        $(document.body).append('<div id="' + id + '" class="box" style="width: ' + w + 'px; height: ' + h + 'px; left: ' + l + 'px; top: ' + t + 'px;">' + id + '</div>');
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
            .data('id', $item.attr('id'))
            .data('b', h - $item.position().top - $item.height())
            .data('l', $item.position().left)
            .data('v', 0)
            .data('w', $item.width())
            .data('h', $item.height())
    });



    var $items = $('.box').toArray(),
        i,
        j,
        $item,
        isCrossed;

    for (i = 0; i < $items.length; ++i)
    {
        $items[i] = $($items[i]);
    }

    $items = $items.sort(sortByBottom);

    procId = setInterval(function ()
    {
        for (i = 0; i < $items.length; ++i)
        {
            $item = $items[i];
            isCrossed = false;

            for (j = 0; j < i; ++j)
            {
                $jtem = $items[j];
                isCrossed = isCrossing($item, $jtem) || isCrossing($jtem, $item);
                if (isCrossed)
                {
                    break;
                }
            }

            if (!isCrossed)
            {
                $item.data('b', $item.data('b') - $item.data('v'));

                if ($item.data('v') < 0)
                {
                    $item.data('v', 0);
                }
                else
                {
                    $item.data('v', $item.data('v') + G);
                }
            }
            else
            {
                $item.data('b', $item.data('b') - $item.data('v'));

                if ($item.data('v') > 0)
                {
                    $item.data('v', 0);
                }
                else
                {
                    $item.data('v', $item.data('v') - G / 10);
                }
            }

            if ($item.data('b') < 0)
            {
                $item.data('b', 0);

                if ($item.data('v') > 0)
                {
                    $item.data('v', 0);
                }
            }

            $item.css({ 'bottom': $item.data('b') });

        };
    }, INTERVAL);
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





var sortByBottom = function ($b1, $b2)
{
    return $b1.data('b') - $b2.data('b');
}






var isCrossing = function ($b1, $b2)
{
    var res = false;

    if (
        (
            $b1.data('l') >= $b2.data('l') &&
            $b1.data('l') <= $b2.data('l') + $b2.data('w') &&
            $b1.data('b') >= $b2.data('b') &&
            $b1.data('b') <= $b2.data('b') + $b2.data('h')
        ) ||
        (
            $b1.data('l') >= $b2.data('l') &&
            $b1.data('l') <= $b2.data('l') + $b2.data('w') &&
            $b1.data('b') + $b1.data('h') >= $b2.data('b') &&
            $b1.data('b') + $b1.data('h') <= $b2.data('b') + $b2.data('h')
        ) ||
        (
            $b1.data('l') + $b1.data('w') >= $b2.data('l') &&
            $b1.data('l') + $b1.data('w') <= $b2.data('l') + $b2.data('w') &&
            $b1.data('b') + $b1.data('h') >= $b2.data('b') &&
            $b1.data('b') + $b1.data('h') <= $b2.data('b') + $b2.data('h')
        ) ||
        (
            $b1.data('l') + $b1.data('w') >= $b2.data('l') &&
            $b1.data('l') + $b1.data('w') <= $b2.data('l') + $b2.data('w') &&
            $b1.data('b') >= $b2.data('b') &&
            $b1.data('b') <= $b2.data('b') + $b2.data('h')
        ) ||
        (
            $b1.data('l') >= $b2.data('l') &&
            $b1.data('l') <= $b2.data('l') + $b2.data('w') &&
            $b1.data('l') + $b1.data('w') >= $b2.data('l') &&
            $b1.data('l') + $b1.data('w') <= $b2.data('l') + $b2.data('w') &&
            $b1.data('b') <= $b2.data('b') &&
            $b1.data('b') + $b1.data('h') >= $b2.data('b') + $b2.data('h')
        )
    )
    {
        res = true;
    }

    return res;
};