[Live Demo](http://htmlpreview.github.io/?https://github.com/hemstreet/Manifest/blob/v1.0/index.html)

How to use
---

Setup config/config.json,
In order for this to work out of the box you must take the slides array and customize the selector,
title and content for each slide you wish to present for each slide. 
```
{
  "underlayClass": "manifest-underlay",
  "startup" : true,
  "manifestTemplate" : "<div class=\"manifest-container\"><h3></h3><p></p><a href=\"#\" data-manifest=\"previous\" class=\"btn btn-sm btn-primary\">Previous</a><a href=\"#\" data-manifest=\"next\" class=\"btn btn-sm btn-primary\">Next</a><a href=\"#\" data-manifest=\"end\" class=\"btn btn-sm btn-success\">End</a></div>",
  "slides": [
    {
      "selector": ".btn-lg.btn-default",
      "title": "Sign up",
      "content": "First element"
    },
    {
      "selector": ".alert.alert-danger",
      "title": "Other slider thing",
      "content": "Halfway page check"
    },
    {
      "selector": ".well",
      "title": "Panel Default",
      "content": "Test data about that panel"
    },
    {
      "selector": "#carousel-example-generic",
      "title": "Id's too!",
      "content": "Slider demo targeting ID"
    }
  ]
}
```

```
npm install -g gulp
gulp
```