+++
title = "{{ replace .Name "-" " " | title }}"
subtitle = ""
date = {{ .Date }}
month = "yyyy/mm"
tags = ["tag", "tag"]
categories = ["Text"]
subcategories = ["subcategory if needed"]
series = ["slug-of-series-if-needed"]
seriesSequenceNumber = 1
slug = "{{ .Name }}"
hasCoverImage = false
draft = false
color = "#"
+++

{{% section-intro %}}
ここに導入文
{{% /section-intro %}}<!--more-->{{% section-body %}}
ここに本文
{{% /section-body %}}
