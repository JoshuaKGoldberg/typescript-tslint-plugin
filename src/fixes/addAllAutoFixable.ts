import * as ts_module from 'typescript/lib/tsserverlibrary';

import { FailureMap } from 'failureMap';
import { convertReplacementToTextChange } from 'replacements';
import { TsLintRunner } from 'runner';

export function addAllAutoFixable(
    fixes: ts_module.CodeAction[],
    documentFixes: FailureMap,
    fileName: string,
    runner: TsLintRunner,
) {
    const allReplacements = runner.getNonOverlappingReplacements(Array.from(documentFixes.values()));
    fixes.push({
        description: `Fix all auto-fixable tslint failures`,
        changes: [{
            fileName,
            textChanges: allReplacements.map(convertReplacementToTextChange),
        }],
    });
}
