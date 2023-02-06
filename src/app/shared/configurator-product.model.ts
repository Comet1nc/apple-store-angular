export class Product {
    public name: string
    public priceUSD: number
    public routeName: string
    public configurationOptions: ConfigurationOption[]
    
    constructor(name: string, priceUSD: number, routeName: string, configurationOptions?: ConfigurationOption[]) {
        this.name = name
        this.priceUSD = priceUSD
        this.routeName = routeName
        this.configurationOptions = configurationOptions
    }
}

export class ConfigurationOption {
    public subTitle: string
    public title: string 
    public type: ConfOptionType
    public options: Option[]

    constructor(subTitle: string, title: string, type: ConfOptionType, options?: Option[]) {
        this.subTitle = subTitle
        this.title = title
        this.type = type
        this.options = options
    }
}

export class Option {
    public subTitle: string
    public title: string 
    public priceUSD: number
    public color?: string

    constructor(subTitle: string, title: string, priceUSD: number) {
        this.subTitle = subTitle
        this.title = title
        this.priceUSD = priceUSD
    }
}

export enum ConfOptionType {
    model = 'model',
    color = 'color',
    storage = 'storage'
}