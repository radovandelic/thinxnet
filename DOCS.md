# thinxnet v0.0.0



- [Agent](#agent)
	- [Create agent](#create-agent)
	- [Delete agent](#delete-agent)
	- [Retrieve agent](#retrieve-agent)
	- [Retrieve agents](#retrieve-agents)
	- [Update agent](#update-agent)
	
- [Issue](#issue)
	- [Create issue](#create-issue)
	- [Delete issue](#delete-issue)
	- [Retrieve issue](#retrieve-issue)
	- [Retrieve issues](#retrieve-issues)
	- [Update issue](#update-issue)
	


# Agent

## Create agent



	POST /agents


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Agent's name.</p>							|
| email			| 			|  <p>Agent's email.</p>							|
| status			| 			|  <p>Agent's status.</p>							|
| issueId			| 			|  <p>Agent's issueId.</p>							|

## Delete agent



	DELETE /agents/:id


## Retrieve agent



	GET /agents/:id


## Retrieve agents



	GET /agents


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update agent



	PUT /agents/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Agent's name.</p>							|
| email			| 			|  <p>Agent's email.</p>							|
| status			| 			|  <p>Agent's status.</p>							|
| issueId			| 			|  <p>Agent's issueId.</p>							|

# Issue

## Create issue



	POST /issues


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| string			|  <p>Issue's title.</p>							|
| description			| string			|  <p>Issue's description.</p>							|
| user			| string			|  <p>Id of user reporting issue</p>							|
| priority			| string			|  <p>Issue's priority.</p>							|
| status			| string			|  <p>Issue's status.</p>							|
| assignedTo			| string			| **optional** <p>Id of the agent the issue is assigned to.</p>							|

## Delete issue



	DELETE /issues/:id


## Retrieve issue



	GET /issues/:id


## Retrieve issues



	GET /issues


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update issue



	PUT /issues/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| 			|  <p>Issue's title.</p>							|
| description			| 			|  <p>Issue's description.</p>							|
| priority			| 			|  <p>Issue's priority.</p>							|
| status			| 			|  <p>Issue's status.</p>							|
| assignedTo			| 			|  <p>Issue's assignedTo.</p>							|


