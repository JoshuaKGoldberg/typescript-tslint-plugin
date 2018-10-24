import * as tslint from 'tslint';
import * as ts_module from 'typescript/lib/tsserverlibrary';

function convertFixToReplacement(fix: tslint.Fix | undefined): tslint.Replacement[] {
    let replacements: tslint.Replacement[] | null = null;
    // in tslint4 a Fix has a replacement property with the Replacements
    if ((fix as any).replacements) {
        // tslint4
        replacements = (fix as any).replacements;
    } else {
        // in tslint 5 a Fix is a Replacement | Replacement[]
        if (!Array.isArray(fix)) {
            replacements = [fix as any];
        } else {
            replacements = fix;
        }
    }
    return replacements || [];
}

export function convertReplacementToTextChange(replacement: tslint.Replacement): ts_module.TextChange {
    return {
        newText: replacement.text,
        span: { start: replacement.start, length: replacement.length },
    };
}

export function convertProblemToFileTextChanges(problem: tslint.RuleFailure, fileName: string): ts_module.FileTextChanges {
    const fix = problem.getFix();
    const replacements: tslint.Replacement[] = convertFixToReplacement(fix);

    return {
        fileName,
        textChanges: replacements.map(convertReplacementToTextChange),
    };
}
