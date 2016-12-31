/*
MMM-GoogleMaps module
by Donovan O'Connor
*/

//Register module
Module.register("MMM-GoogleMaps", {
    //Defaults
    defaults: {
        api_key: "",
        origin: "",
        destination: "",
        base_url: "https://www.google.com/maps/embed/v1/directions?key=",
        avoid: {
            tolls: true,
            ferries: true,
            highways: false
        },
        mode: "driving",
        waypoints: [],
        width: "300px",
        height: "300px"
    },
    
    //Override the dom
    getDom: function()
    {
        var wrapper = document.createElement("IFRAME");
        wrapper.style = "border:0";
        wrapper.width = this.config.width;
        wrapper.height = this.config.height;
        wrapper.src = this.buildURL();
        return wrapper;
    },
    
    //Build the avoid portion of the URL
    buildAvoid: function()
    {
        //String to hold the avoid part of the URL
        var avoid = "&avoid=";
        //Boolean to determine if we need to add a "|" character to the string
        //True means it's the first item & therefore no "|" will be added
        var firstOption = true;
        //Loop through every key in the object
        for(var key in this.config.avoid)
        {
            //If the traffic option is marked as true, we add it to the string
            if(this.config.avoid[key] == true)
            {
                //Piping character or no piping character
                if(firstOption)
                {
                    avoid += key;
                    firstOption = false;
                }
                else
                {
                    avoid += "|" + key;
                }
            }
        }
        
        //If avoid has no values set to true, we return an empty string
        if(avoid == "&avoid=")
        {
            return "";
        }
        else
        {
            return avoid;
        }
    },
    
    //Build the waypoint portion of the URL
    buildWaypoints: function()
    {
        //String to hold the waypoints part of the URL
        var waypoints = "&waypoints=";
        //Join the array of waypoints together and add it to the URL
        waypoints += this.config.waypoints.join("|");
        
        return waypoints;
    },
    
    //Build the FULL URL
    buildURL: function()
    {
        //String to hold the entire URL
        var requestURL = this.config.base_url;
        //Add the API key
        requestURL += this.config.api_key;
        //Add the origin
        requestURL += "&origin=" + this.config.origin;
        //Add the destination
        requestURL += "&destination=" + this.config.destination;
        //Add waypoints, if there are any
        if(this.config.waypoints.length != 0)
        {
            requestURL += this.buildWaypoints();
        }
        //Add avoids
        requestURL += this.buildAvoid();
        
        return requestURL;
    }
})