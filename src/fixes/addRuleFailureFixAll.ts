import * as ts_module from 'typescript/lib/tsserverlibrary';

import { FailureMap } from 'failureMap';
import { convertProblemToFileTextChanges } from 'replacements';

/**
 * Generate a code action that fixes all instances of ruleName.
 */
export function addRuleFailureFixAll(fixes: ts_module.CodeAction[], ruleName: string, problems: FailureMap, fileName: string) {
    const changes: ts_module.FileTextChanges[] = [];

    for (const problem of problems.values()) {
        if (problem.getRuleName() === ruleName) {
            changes.push(convertProblemToFileTextChanges(problem, fileName));
        }
    }

    /* No need for this action if there's only one instance. */
    if (changes.length < 2) {
        return;
    }

    fixes.push({
        description: `Fix all '${ruleName}'`,
        changes,
    });
}
