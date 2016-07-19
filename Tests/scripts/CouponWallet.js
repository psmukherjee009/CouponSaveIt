var global = {
	retrieve_url : "http://www.parthamukherjee.com/cgi-perl/GlobalCouponManager4.cgi/RETRIEVE/?json=1"
};

function ajax_getver(url) {
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'json',
		cache:false,
		success: function(ret){
			alert("Success "+ret.message);
			return ret.message;
		},
		error: function(ret){
			alert("Handle Errors here"+ret.message);
			return "";
		}
	});
}
    
function Page_Home() {
	var stored_coupons = ajax_getver(retrieve_url);
	var coupon_list = JSON.parse(stored_coupons);
	markup = "";
	for (var i = 0 ; i < coupon_list.length ; ++i) {
		markup += '<div class="image" id='.coupon_list[i].pp_coupon_id.' style="background-image:url('.coupon_list[i].image_url.');">';
		markup += '<a href="'.coupon_list[i].target_url.'" class="delete">Delete</a>
    </div>
	}
	
	
}

$(document).bind("mobileinit", function() {
	$.mobile.page.prototype.options.addBackBtn = true;
	$.mobile.selectmenu.prototype.options.nativeMenu = false;
	$.mobile.changePage.defaults.allowSamePageTransition = true;
});

$(document).ready(function() {
	//alert("Ready");
	$(document).bind( "pagebeforechange", function( e, data ) {
		PageBeforeChange(e,data);
	});
	
	 $('a.delete').on('click',function(e){
        e.preventDefault();
        imageID = $(this).closest('.image')[0].id;
        alert('Now deleting "'+imageID+'"');
        $(this).closest('.image')
            .fadeTo(300,0,function(){
                $(this).animate({width:0},200,function(){
                        $(this).remove();
                    });
		});
	});
	Page_Home();
});