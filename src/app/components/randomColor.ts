export default function(){
    const colors = [
        "#23b6e4",
        "#f7a52c",
        "#44aa63",
        "#6cb9ed",
        "#FFAEBC",
        "#FFAEBC",
        "#D63484",
        "#43766C",
        "#FF90BC",
        "#EE7214",
        "#8ADAB2",
        "#7071E8",
    ]

    const min = Math.ceil(0);
    const max = Math.floor(colors.length-1);
    return colors[Math.floor(Math.random() * (max - min + 1)) + min];
}