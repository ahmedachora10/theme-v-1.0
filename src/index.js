/* eslint-disable no-undef */
import "./style.scss";
import "../node_modules/bootstrap/js/dist/carousel";
import * as $ from "../node_modules/jquery/dist/jquery.min";
// import "../node_modules/@popperjs/core/dist/esm/popper";

/**
 * Show Menu Bar
 */
$("#show-menu").on("click", function() {
    $("#menu-bar").toggleClass("menu-display");
});

$(".close-btn").on("click", function() {
    $("#menu-bar").removeClass("menu-display");
});

/**
 * Toggle Sub Menu
 */
$(".drop-menu").each(function() {
    $(this).on("click", function() {
        $(this).find(".sub-menu").toggle({
            duration: 500, // milliseconds
            easing: "linear",
        });
    });
});

/**
 * Toggle Offers List
 */
$(".offers-list > ul > li").each(function() {
    $(this).on("click", function() {
        $(this).find(".sub-menu").toggle("slow");
        $(this).siblings().find(".sub-menu").slideUp();
        $(this).addClass("offers-active");
        $(this).siblings().removeClass("offers-active");
    });
});