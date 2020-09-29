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

<p>Creates an agent and immediately assigns him to the first open issue if any</p>

	POST /agents


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| string			|  <p>Agent's name.</p>							|
| email			| string			|  <p>Agent's email.</p>							|
| status			| string			|  <p>Agent's status.</p>							|
| issueId			| string			|  <p>Id of issue assigned to Agent (if any)</p>							|

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

<p>Updates an agent and if his status is &quot;available&quot;, he is immediately assigned to the first open issue</p>

	PUT /agents/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| string			|  <p>Agent's name.</p>							|
| email			| string			|  <p>Agent's email.</p>							|
| status			| string			|  <p>Agent's status.</p>							|
| issueId			| string			|  <p>Id of issue assigned to Agent (if any)</p>							|

# Issue

## Create issue

<p>Creates a new issue and immediately assigns it to the first available agent, if any are available</p>

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

<p>Updates an issue, if the issue is closed the assigned agent is assigned to the next open issue, if any</p>

	PUT /issues/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| string			|  <p>Issue's title.</p>							|
| description			| string			|  <p>Issue's description.</p>							|
| user			| string			|  <p>Id of user reporting issue</p>							|
| priority			| string			|  <p>Issue's priority.</p>							|
| status			| string			|  <p>Issue's status.</p>							|
| assignedTo			| string			| **optional** <p>Id of the agent the issue is assigned to.</p>							|


