import * as tslint from 'tslint';
import * as ts_module from 'typescript/lib/tsserverlibrary';

import { convertProblemToFileTextChanges } from 'replacements';

export function addRuleFailureFix(fixes: ts_module.CodeAction[], problem: tslint.RuleFailure, fileName: string) {
    fixes.push({
        description: `Fix '${problem.getRuleName()}'`,
        changes: [convertProblemToFileTextChanges(problem, fileName)],
    });
}
