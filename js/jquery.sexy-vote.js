jQuery.fn.sexyVote = function(config) {
    config = config || {};
    var defaults = {
		url_ajax: "reqvest.php",
		activeImageSrc: "../images/active_star.gif",
		passiveImageSrc: "../images/passive_star.gif",
		maxScore: 5,
		idElement:0,
		fn: new Function(),
		messages: [
			"Спасибо за ваш выбор!",
			"Очень плохо",
			"Плохо",
			"Хорошо, но не совсем",
			"Хорошо",
			"Очень хорошо"
		]
    };   
    
    config = jQuery.extend(defaults, config);
     
    return this.each(function() 
	{
		var $container = jQuery(this);
		
		for (var i = 0, num = config.maxScore * 2; i < num; ++i) {
			jQuery("<img />").appendTo($container);    
		}
		jQuery("<span />").appendTo($container);
		
		$.ajax(
		{
			type: "GET",
			url: config.url_ajax,
			data: "start&id=" + config.idElement, 
			success: function (data)
			{
				$("#rez").text("");
				$("#rez").append(data); 
			},
			error: function(){
				$("#rez").text("");
				$("#rez").append('Error. The request failed.');  
			}
		});
		
		$container.find("img:even").attr("src", config.passiveImageSrc).css({display: "inline"}).
		bind("mouseover", function(e) 
		{	    
			var len = $container.find("img:even").index(e.target) + 1;
			$container.find("img:even").slice(0, len).css({display: "none"});
			$container.find("img:odd").slice(0, len).css({display: "inline"});
			$container.find("span").text(config.messages[len]);
		}).end().
		find("img:odd").attr("src", config.activeImageSrc).css({display: "none"}).
		bind("mouseout", function(e) 
		{
			var len = $container.find("img:odd").index(e.target) + 1;
			$container.find("img:odd").slice(0, len).css({display: "none"});
			$container.find("img:even").slice(0,  len).css({display: "inline"});
			$container.find("span").text("");
		}).
		bind("click", function(e) 
		{
			$container.find("img").unbind("mouseover").unbind("mouseout").unbind("click");
			$container.find("span").text(config.messages[0]);
			var len = $container.find("img:odd").index(e.target) + 1;
			config.fn.call(this, e, len);
			$.ajax(
			{
				type: "GET",
				url: config.url_ajax,
				data: "val=" + len + "&id="+config.idElement, 
				success: function (data)
				{
					$("#rez").text("");
					$("#rez").append(data); 
				},
				error: function(){
					$("#rez").text("");
					$("#rez").append('Error. The request failed.');  
				}
			}); 
		});
    });
}; 
