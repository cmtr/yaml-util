# yaml-util
YAML Util - Pre-processing of YAML files

## Extract

### IO

#### File

*Key:* $File


## Transform
Transformation 

### Graph

#### Reference
Value of a relative path

*Key:* $Ref

**Example:**	
```yaml
independent:
	lorem: ipsum
dependent:
	asObject:
		$Ref: independent.ipsum
	asString: $Ref independent.ipsum
```


### Object

### Array

#### Map

#### Reduce

### Math

#### Mean

### Options

* **encoding**: utf-8
* **recursive**: true
