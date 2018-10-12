/**
 * User: Agenzzia
 * Web:  www.agenzzia.com
 * Date: 11/24/2016
 * Time: 3:51 PM
 */
jQuery.fn.ForceNumericOnly =
    function() {
        return this.each(function() {
            $(this).keydown(function(e) {
                var key = e.charCode || e.keyCode || 0;
                // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                // home, end, period, and numpad decimal
                return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
            });
        });
    };

/*
usage:
 $("#yourTextBoxName").ForceNumericOnly();
 */

jQuery.fn.ForceNumericOnlyInteger =
    function() {
        return this.each(function() {
            $(this).keydown(function(e) {
                var key = e.charCode || e.keyCode || 0;
                // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                // home, end,
                return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 109 ||
                key == 189 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
            });
        });
    };

/*
usage:
 $("#yourTextBoxName").ForceNumericOnlyInteger();
 */

jQuery.fn.ForceNumericOnlyWithoutAnyOther =
    function() {
        return this.each(function() {
            $(this).keydown(function(e) {
                var key = e.charCode || e.keyCode || 0;
                // allow only numbers numpad or keypad, backspace, delete and arrows
                return (
                    key == 8 ||
                    key == 13 ||
                    key == 46 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105)
                );

            });
        });
    };

/*
usage:
 $("#yourTextBoxName").ForceNumericOnlyWithoutAnyOther();
 */