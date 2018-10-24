import * as tslint from 'tslint';
import * as ts_module from 'typescript/lib/tsserverlibrary';

export function addDisableRuleFix(fixes: ts_module.CodeAction[], problem: tslint.RuleFailure, fileName: string, file: ts_module.SourceFile) {
    fixes.push({
        description: `Disable rule '${problem.getRuleName()}'`,
        changes: [{
            fileName,
            textChanges: [{
                newText: `// tslint:disable-next-line:${problem.getRuleName()}\n`,
                span: { start: file.getLineStarts()[problem.getStartPosition().getLineAndCharacter().line], length: 0 },
            }],
        }],
    });
}
