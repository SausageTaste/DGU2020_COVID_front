
class AminoAcidDef {

    public triple_name: string;
    public code: string;
    public full_name: string;

    constructor(triple_name: string, code: string, full_name: string) {
        this.triple_name = triple_name;
        this.code = code;
        this.full_name = full_name;
    }

}


// https://www.genome.jp/kegg/catalog/codes1.html
const AMINO_ACID_DEFINITIONS = [
    new AminoAcidDef("Ala", "A", "Alanine"),
    new AminoAcidDef("Arg", "R", "Arginine"),
    new AminoAcidDef("Asn", "N", "Asparagine"),
    new AminoAcidDef("Asp", "D", "Aspartic acid"),
    new AminoAcidDef("Cys", "C", "Cysteine"),
    new AminoAcidDef("Gln", "Q", "Glutamine"),
    new AminoAcidDef("Glu", "E", "Glutamic acid"),
    new AminoAcidDef("Gly", "G", "Glycine"),
    new AminoAcidDef("His", "H", "Histidine"),
    new AminoAcidDef("Ile", "I", "Isoleucine"),
    new AminoAcidDef("Leu", "L", "Leucine"),
    new AminoAcidDef("Lys", "K", "Lysine"),
    new AminoAcidDef("Met", "M", "Methionine"),
    new AminoAcidDef("Phe", "F", "Phenylalanine"),
    new AminoAcidDef("Pro", "P", "Proline"),
    new AminoAcidDef("Ser", "S", "Serine"),
    new AminoAcidDef("Thr", "T", "Threonine"),
    new AminoAcidDef("Trp", "W", "Tryptophan"),
    new AminoAcidDef("Tyr", "Y", "Tyrosine"),
    new AminoAcidDef("Val", "V", "Valine"),
    new AminoAcidDef("Asx", "B", "Asn or Asp"),
    new AminoAcidDef("Glx", "Z", "Gln or Glu"),
    new AminoAcidDef("Xle", "J", "Leu or Ile"),
    new AminoAcidDef("Sec", "U", "Selenocysteine (UGA)"),
    new AminoAcidDef("Pyl", "O", "Pyrrolysine (UAG)"),
    new AminoAcidDef("Unk", "X", "Unknown"),
];


// https://www.ncbi.nlm.nih.gov/Taxonomy/taxonomyhome.html/index.cgi?chapter=tgencodes#SG1
export function translate_standard_code(a_triplet: string): string {
    const MAP = {
        "TTT": "Phe", "TCT": "Ser", "TAT": "Tyr", "TGT": "Cys",
        "TTC": "Phe", "TCC": "Ser", "TAC": "Tyr", "TGC": "Cys",
        "TTA": "Leu", "TCA": "Ser", "TAA": "Ter", "TGA": "Ter",
        "TTG": "Leu", "TCG": "Ser", "TAG": "Ter", "TGG": "Trp",

        "CTT": "Leu", "CCT": "Pro", "CAT": "His", "CGT": "Arg",
        "CTC": "Leu", "CCC": "Pro", "CAC": "His", "CGC": "Arg",
        "CTA": "Leu", "CCA": "Pro", "CAA": "Gln", "CGA": "Arg",
        "CTG": "Leu", "CCG": "Pro", "CAG": "Gln", "CGG": "Arg",

        "ATT": "Ile", "ACT": "Thr", "AAT": "Asn", "AGT": "Ser",
        "ATC": "Ile", "ACC": "Thr", "AAC": "Asn", "AGC": "Ser",
        "ATA": "Ile", "ACA": "Thr", "AAA": "Lys", "AGA": "Arg",
        "ATG": "Met", "ACG": "Thr", "AAG": "Lys", "AGG": "Arg",

        "GTT": "Val", "GCT": "Ala", "GAT": "Asp", "GGT": "Gly",
        "GTC": "Val", "GCC": "Ala", "GAC": "Asp", "GGC": "Gly",
        "GTA": "Val", "GCA": "Ala", "GAA": "Glu", "GGA": "Gly",
        "GTG": "Val", "GCG": "Ala", "GAG": "Glu", "GGG": "Gly",
    };

    return MAP[a_triplet];
}

export function get_amino_acid_info_with_triplet_name(triple_name: string) {
    for (const x of AMINO_ACID_DEFINITIONS) {
        if (triple_name == x.triple_name) {
            return x;
        }
    }

    return null;
}
