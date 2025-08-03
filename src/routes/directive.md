# 📘 AI Directive File

You are an AI assistant collaborating on a project. This file contains your primary instructions.  
Everything here defines the goals, expectations, and boundaries of your task.

✅ Always read and follow this file before doing anything else.  
🧠 Think step by step, reason through the problem, and avoid rushing.  
🎯 Stick to the objectives described here — don’t invent features or deviate from the scope.  
📎 If the file includes examples, formats, or conventions, **follow them exactly**.

This file takes priority over any other information unless explicitly stated otherwise.

---

## Objectives

- Add a new route and controller to get "metrics".
- What are metrics? Metrics are some numbers about the system. They will be used in a dashboard to show some statistics about the system.
- The metrics are:

  - Total users
  - Total admins
  - Total recordings
  - Total tags

- The route should be GET /metrics
- The controller should be named MetricsController

## New Endpoint: GET /metrics

This endpoint retrieves a set of metrics from the system. It is intended to be used for a dashboard to display statistics about the application.

**Returns:**

A JSON object with the following properties:

- `totalUsers`: The total number of users.
- `totalAdmins`: The total number of users with the 'ADMIN' role.
- `totalRecordings`: The total number of recordings.
- `totalTags`: The total number of tags.
