#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { TaskStack } from "../lib/stacks/task-stack";
import { DatabaseStack } from "../lib/stacks/database-stack";

const app = new cdk.App();
new TaskStack(app, "TaskStack", {});
new DatabaseStack(app, "DatabaseStack", {});
